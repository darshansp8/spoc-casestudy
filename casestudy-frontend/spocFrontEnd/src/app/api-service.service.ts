import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  public requestUrl: string = "http://localhost:8083/show";
  public singleRequestUrl: string = "http://localhost:8083/show/";
  public techTrainersUrl: string = "http://localhost:8083/trainers/";
  public roomUrl: string = "http://localhost:8083/rooms/";
  public sendRequestUrl: string = "http://localhost:8083/update";
  public sendFinalRequestUrl: string = "http://localhost:8083/finalrequest/";

  constructor(private http: HttpClient) { }

  getPendingRequest(){
    // console.log(this.http.get(this.requestUrl));
    return this.http.get(this.requestUrl);
  }

  getRequestById(id){
    // console.log(this.http.get(this.singleRequestUrl+id));
    return this.http.get(this.singleRequestUrl+id);
  }

  getTrainerByTechnology(tech){
    return this.http.get(this.techTrainersUrl+tech);
  }

  getRoomByCapacity(cc){
    return this.http.get(this.roomUrl+cc);
  }

  sendRequest(request:any){
    return this.http.post<any>(this.sendRequestUrl, request);
  }

  sendFinalRequest(finalRequest:any, trainerId:any, roomId:any){
    return this.http.post<any>(this.sendFinalRequestUrl+trainerId+'/'+roomId,finalRequest)
  }



}
