import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { Time } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

  // isChecked: boolean;
  isCheckedTrainerName: any;
  isCheckedRoomName: any;
  isCheckedTrainer: boolean;
  isCheckedRoom: boolean;
  trainerSet: boolean;
  roomSet: boolean;
  showUpdateForm: boolean = false;
  showApprovalForm: boolean = false;

 //For Trainers of particlaur technology
  public techTrainers: any=[];
  trainerId:number;
  trainerName:string;
  trainerTechnologyId: number;
  trainerAvailFromDate:Date;
  trainerAvailTillDate:Date;
  trainerAvailFromTime:Time;
  trainerAvailTillTime:Time;
  contact:string;
  alreadyAssignedTrainer:boolean;

  public technology_id: any;

  //For available rooms
  public rooms: any=[];
  roomId:number;
  roomNo:number;
  capacity:number;
  roomAvailFromDate:Date;
  roomAvailTillDate:Date;
  roomAvailFromTime:Time;
  roomAvailTillTime:Time;
  alreadyAssignedRoom:boolean;

  public room_capacity: any;

  public singleRequest: any=[];
  public requestArray:any = [];
  requestId:number;
  verticalId:number;
  verticalName:string
  technologyId:number;
  technologyName:string;
  pmName:string;
  candidateCount:number;
  trainingMode:string;
  trainingStartDate:Date;
  trainingEndDate:Date;
  trainingStartTime:Time;
  trainingEndTime:Time;
  comment:any;
  requestStatus:boolean;

  public request_id:any;

  constructor(private api: ApiServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    this.request_id = id;
    // console.log(this.request_id);
    this.api.getRequestById(this.request_id)
    .subscribe(data => 
      this.singleRequest = data);
    // console.log(this.singleRequest);

    let tid = this.route.snapshot.paramMap.get('tid');
    this.technology_id = tid;
    this.api.getTrainerById(this.technology_id)
    .subscribe(data => {
      this.techTrainers = Array.from(Object.keys(data),k=>data[k]);
    });

    let cc = this.route.snapshot.paramMap.get('cc');
    this.room_capacity = cc;
    this.api.getRoomByCapacity(this.room_capacity)
    .subscribe(data => {
      this.rooms = Array.from(Object.keys(data),k=>data[k]);
    });
  }


  editForm(){
    this.showUpdateForm =true;
  }

  approvalForm(){
    this.showApprovalForm = true;
  }

  updateRequest(){
    // this.requestArray.push(this.singleRequest);
    console.log(this.singleRequest);
    // console.log(this.requestArray);

    this.api.sendRequest(this.singleRequest)
    .subscribe(
      data => console.log('Success', data),
      error => console.log('Error', error)
    );
  }

  selectCheckboxTrainer(e){
    this.isCheckedTrainer = !this.isCheckedTrainer;
    this.isCheckedTrainerName = e.target.name;
  }

  selectCheckboxRoom(e){
    this.isCheckedRoom = !this.isCheckedRoom;
    this.isCheckedRoomName = e.target.name;
  }
}
