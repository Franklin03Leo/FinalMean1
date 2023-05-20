import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class MyServiceService {
  private url: string = 'https://crud-application4.onrender.com/'; //'http://localhost:3000/';
  
  constructor(private http : HttpClient ) { }

  postData(data : any){
    return this.http.post<any>(`${this.url}create`, data);
  }

  getAllData(){
    return this.http.get<any>(`${this.url}getData`);
  }

  updateDetails(data: any) {
    let id = data._id;
    console.log('data', id);
    return this.http.put<any>(`${this.url}updateData/${id}`, data);
  }

  deletedata(id: any) {
    console.log('data', id);
    return this.http.delete<any>(`${this.url}deleteData/${id}`);
  }
}
