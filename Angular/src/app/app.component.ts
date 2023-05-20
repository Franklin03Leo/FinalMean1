import { Component } from '@angular/core';
import { MyServiceService } from './services/my-service.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  constructor(private AppService: MyServiceService){

  }
  fName : string ='';
  lName : string ='';
  eID: number | null = null;
  experience : string ='';
  designation : string ='';
  tableData : any = [];
  defaultColDef = {
    sortable: true,
    filter: true
  };
  tempFlag = 1;
  _id : any = '';
  checkUpdateindex ='';
  ngOnInit() {
    this.getAllData();

  }
  cancel(){
    this.fName = '';
    this.lName = '';
    this.eID = null;
    this.experience = '';
    this.designation = '';
    this._id = '';
  }
  submit(){
    if(!(this.fName || this.lName || this.experience || this.designation) || this.eID == null){
      Swal.fire('', 'pls fill all the fields', 'info');
      return ;
    }
    let sourceData ={}
    sourceData = {
      "FirstName" : this.fName,
      "LastName" : this.lName,
      "EmployeID" : this.eID,
      "Experience" : this.experience,
      "Designation" : this.designation,
    }
    

    if(this.tempFlag !=2){
      const foundEmployee = this.tableData.find((val: any) => val.EmployeID === this.eID );
      if (foundEmployee) {
        Swal.fire('', 'Employee ID already exists', 'info');
        return;
      }
      this.AppService.postData(sourceData).subscribe(res=>{
        console.log(res.message )
        if(res.message = 'User document inserted successfully'){
          Swal.fire({
            title: 'Registered Successfully',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
          });
          this.getAllData();
        }
        else{
          Swal.fire('', 'Failed to update data', 'info');
          return ;
        }
      });
    }else{
      const foundEmployee = this.tableData.find((val: any) => {
        return val.EmployeID === this.eID && this.tableData[this.checkUpdateindex].EmployeID != this.eID
       });
       if (foundEmployee) {
         Swal.fire('', 'Employee ID already exists', 'info');
         return;
       }

      Object.assign(sourceData, {_id: this._id});
      console.log('source data -',sourceData)
      this.AppService.updateDetails(sourceData).subscribe(res => {
        Swal.fire('', 'Data updated successfully', 'success');
        this.getAllData();
        this.tempFlag = 1;
        return
      })
    }
    setTimeout(() => {
      this.cancel();
    }, 0);
  }

  editData(row: any, index : any){
    this.tempFlag = 2;
    this.fName = this.tableData[index].FirstName
    this.lName = this.tableData[index].LastName
    this.eID = this.tableData[index].EmployeID
    this.experience = this.tableData[index].Experience
    this.designation = this.tableData[index].Designation
    this._id = this.tableData[index]._id
    this.checkUpdateindex = index
  }

  deleteProduct(row: any, index :any){
    this.AppService.deletedata(this.tableData[index]._id).subscribe(res => {
      Swal.fire('', 'Data deleted successfully', 'info');
    })
    this.tableData.splice(index, 1);
    return;
  }

  getAllData(){
    this.AppService.getAllData().subscribe(res =>{
      if(res != '' && res != undefined){
        this.tableData = [...res];
      }
    })
  }

}
