import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class MyServiceService {
  
  constructor(private http : HttpClient) { }

  // let url = 'http://localhost:3000/';

  postData(data : any){

    return this.http.post<any>('http://localhost:3000/create', data);
  }

  getAllData(){
    return this.http.get<any>('http://localhost:3000/getData');
  }

  updateDetails(data: any) {
    let id = data._id;
    console.log('data', id);
    return this.http.put<any>(`http://localhost:3000/updateData/${id}`, data);
  }

  deletedata(id: any) {
    console.log('data', id);
    return this.http.delete<any>(`http://localhost:3000/deleteData/${id}`);
  }
}
