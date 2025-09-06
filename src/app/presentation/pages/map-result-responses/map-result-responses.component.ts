import { ChangeDetectorRef, Component } from '@angular/core';
import { InquestResultsResponse } from '../../../domain/models/inquest/get-results/inquest.results.response';
import { QuestionResultsResponse } from '../../../domain/models/inquest/get-results/question.results.response';
import { InquestFacade } from '../../../application/facades/inquest.facade';
import { ChartFacade } from '../../../application/facades/chart.facade';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { ChartHubService } from '../../../infrastructure/services/chart.hub.service';
import { UUID } from 'crypto';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-map-result-responses',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, GoogleMapsModule],
  templateUrl: './map-result-responses.component.html',
  styleUrl: './map-result-responses.component.css'
})
export class MapResultResponsesComponent {
  inquestsResults: InquestResultsResponse[] | undefined;
  questionsInquestsResults: QuestionResultsResponse[] | undefined;
  inquestResultSelected: InquestResultsResponse | undefined;
  questionInquestResultSelected: QuestionResultsResponse | undefined;
  showGraphMap: boolean = false;
  center = { lat: 10.0368384, lng: -73.23648 };
  markers: any[] = [];
  private colorMap = new Map<string, string>();
  private availableColors = [
    'red', 'green', 'blue', 'yellow', 'purple', 'orange', 'pink',
    'brown', 'gray', 'lightblue', 'darkgreen', 'black',
  ];
  
  constructor(private inquestFacade: InquestFacade,
              private notificationFacade: NotificationFacade,
              private cdRef: ChangeDetectorRef,
              private chartHubService: ChartHubService) {}

  async ngOnInit(): Promise<void> {
    this.chartHubService.GetChartRefreshObservable().subscribe(async (idInquest) => {
      await this.LoadInquestsResults();
      if (idInquest && this.inquestResultSelected?.id === idInquest)
        await this.UpdateDataInInquestAnsQuestionSelected(idInquest);
    });
    await this.LoadInquestsResults();
  }

  private ClearGraph = () : void => {
    this.showGraphMap = false;
  }

  private GenerateMap = () => {
    const coordGroups = new Map<string, { lat: number, lng: number, responses: string[] }>();
    if (this.questionInquestResultSelected) {
      for (const res of this.questionInquestResultSelected.responses) {
        const key = `${res.latitude.toFixed(6)}|${res.longitude.toFixed(6)}`;
        if (!coordGroups.has(key))
          coordGroups.set(key, { lat: res.latitude, lng: res.longitude, responses: [res.response] });
        else
          coordGroups.get(key)!.responses.push(res.response);
      }
      const OFFSET_RADIUS = 0.00005;
      this.markers = [];
      coordGroups.forEach((group, key) => {
        group.responses.forEach((response, index) => {
          const angle = (index * 360 / group.responses.length) * (Math.PI / 180);
          const latOffset = Math.cos(angle) * OFFSET_RADIUS;
          const lngOffset = Math.sin(angle) * OFFSET_RADIUS;
          const newLat = group.lat + latOffset;
          const newLng = group.lng + lngOffset;
          this.markers.push({
            position: { lat: newLat, lng: newLng },
            response: response,
            icon: this.GetIconByResponse(response),
            info: `Respuesta: ${response}`
          });
        });
      });
    }
  }

  private GetIconByResponse = (response: string) : any => {
    if (!this.colorMap.has(response)) {
      const color = this.availableColors[this.colorMap.size % this.availableColors.length];
      this.colorMap.set(response, color);
    }
    const assignedColor = this.colorMap.get(response)!;
    return {
      url: `http://maps.google.com/mapfiles/ms/icons/${assignedColor}-dot.png`,
      scaledSize: new google.maps.Size(40, 40),
    };
  }

  GraphMap = () : void => {
    if (this.ValidateQuestionSelectedForGraph() && this.questionInquestResultSelected) {
      this.ClearGraph();
      this.showGraphMap = true;
      this.cdRef.detectChanges();
      this.GenerateMap();
    }
  }

  LoadInquestsResults = async () : Promise<void> => {
    return new Promise((resolve) => {
      this.inquestFacade.GetAllResults().subscribe({
        next: (response) => {
          if (response.succeeded) {
            this.inquestsResults = response.data.inquests;
            resolve();
          } else {
            this.notificationFacade.Error(response.message);
            resolve();
          }
        },
        error: (err) => {
          this.notificationFacade.Error('Ocurrió un error al intentar consultar los resultados.');
          resolve();
        }
      });
    });
  };

  LoadQuestionsInSelect = () : void => {
    if (this.inquestResultSelected) {
      this.questionsInquestsResults = this.inquestResultSelected?.questions;
      this.questionInquestResultSelected = undefined;
      this.ClearGraph();
    } else {
      this.ClearGraph();
      this.questionsInquestsResults = [];
      this.questionInquestResultSelected = undefined;
    }
  }

  RefreshQuestionsInSelect = () : void => {
    if (this.inquestResultSelected) {
      this.questionsInquestsResults = this.inquestResultSelected?.questions;
      this.questionInquestResultSelected = undefined;
    }
  }

  ReloadGraph = () : void => {
    if (this.showGraphMap)
      this.GraphMap();
  }

  SelectedInquest = () : void =>
     this.LoadQuestionsInSelect();

  SelectedQuestion = () : void => {
    this.ClearGraph();
    this.GraphMap();
  }

  private UpdateDataInInquestAnsQuestionSelected = async (idInquest: UUID): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    const currentInquestId = this.inquestResultSelected?.id;
    const currentQuestionId = this.questionInquestResultSelected?.id;
    const updatedInquest = this.inquestsResults?.find(inq => inq.id === idInquest);    
    if (updatedInquest) {
      if (currentInquestId)
        this.inquestResultSelected = this.inquestsResults?.find(i => i.id === currentInquestId);
      this.RefreshQuestionsInSelect();
      if (currentQuestionId)
        this.questionInquestResultSelected = this.questionsInquestsResults?.find(
          q => q.id === currentQuestionId);
      if (this.questionInquestResultSelected)
        this.ReloadGraph();
    }
  }

  ValidateQuestionSelectedForGraph = () : boolean => {
    if (this.questionInquestResultSelected !== undefined) {
      return true;
    } else {
      this.notificationFacade.Error("Debe seleccionar la pregunta para representarla en el mapa.");
      return false;
    }
  }
}