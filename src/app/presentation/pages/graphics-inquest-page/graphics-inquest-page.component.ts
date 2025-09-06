import { ChangeDetectorRef, Component } from '@angular/core';
import { InquestFacade } from '../../../application/facades/inquest.facade';
import { InquestResultsResponse } from '../../../domain/models/inquest/get-results/inquest.results.response';
import { NotificationFacade } from '../../../application/facades/notification.facade';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartFacade } from '../../../application/facades/chart.facade';
import { ChartHubService } from '../../../infrastructure/services/chart.hub.service';
import { UUID } from 'crypto';
import { QuestionResultsResponse } from '../../../domain/models/inquest/get-results/question.results.response';

@Component({
  selector: 'app-graphics-inquest-page',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './graphics-inquest-page.component.html',
  styleUrl: './graphics-inquest-page.component.css'
})
export class GraphicsInquestPageComponent {
  inquestsResults: InquestResultsResponse[] | undefined;
  questionsInquestsResults: QuestionResultsResponse[] | undefined;
  inquestResultSelected: InquestResultsResponse | undefined;
  questionInquestResultSelected: QuestionResultsResponse | undefined;
  showGraphBar: boolean = false;
  showGraphLine: boolean = false;
  showGraphPie: boolean = false;
  showGraphRadar: boolean = false;
  
  constructor(private inquestFacade: InquestFacade,
              private chartFacade: ChartFacade,
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
    this.showGraphBar = false;
    this.showGraphLine = false;
    this.showGraphPie = false;
    this.showGraphRadar = false;
  }

  GraphBar = () : void => {
    if (this.ValidateQuestionSelectedForGraph() && this.questionInquestResultSelected) {
      this.showGraphBar = true;
      this.cdRef.detectChanges();
      this.chartFacade.CreateBarChart("surveyAnyChart", this.questionInquestResultSelected);
    }
  }

  GraphLine = () : void => {
    if (this.ValidateQuestionSelectedForGraph() && this.questionInquestResultSelected) {
      this.showGraphLine = true;
      this.cdRef.detectChanges();
      this.chartFacade.CreateLineChart("surveyAnyChart", this.questionInquestResultSelected);
    }
  }

  GraphPie = () : void => {
    if (this.ValidateQuestionSelectedForGraph() && this.questionInquestResultSelected) {
      this.showGraphPie = true;
      this.cdRef.detectChanges();
      this.chartFacade.CreatePieChart("surveyAnyChart", this.questionInquestResultSelected);
    }
  }

  GraphRadar  = () : void => {
    if (this.ValidateQuestionSelectedForGraph() && this.questionInquestResultSelected) {
      this.showGraphRadar = true;
      this.cdRef.detectChanges();
      this.chartFacade.CreateRadarChart("surveyAnyChart", this.questionInquestResultSelected);
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
    if (this.showGraphBar)
      this.GraphBar();

    if (this.showGraphLine)
      this.GraphLine();
    
    if (this.showGraphPie)
      this.GraphPie();

    if (this.showGraphRadar)
      this.GraphRadar();
  }

  SelectedInquest = () : void =>
     this.LoadQuestionsInSelect();

  SelectedQuestion = () : void => 
    this.ClearGraph();

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
      this.notificationFacade.Error("Debe seleccionar la pregunta para graficarla");
      return false;
    }
  }
}