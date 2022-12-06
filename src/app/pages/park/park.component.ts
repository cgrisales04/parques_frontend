import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Parques, ResponseGetHttp } from 'src/app/interfaces/interfaces';
import { ParkService } from 'src/app/services/park.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { Parque } from '../../interfaces/interfaces';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent implements OnInit {
  public _park!: Parques;
  public _municipios!: any;
  public _parkSelected: any = {};
  private nameInputs = [
    'nombre_parques',
    'direccion_parques',
    'telefono_parques',
    'codigo_municipios'
  ];
  public accion: string = 'Agregar';

  form_park: FormGroup = this.fb.group({
    nombre_parques: ['', [Validators.required]],
    direccion_parques: ['', [Validators.required]],
    telefono_parques: ['', [Validators.required]],
    codigo_municipios: ['0', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private parkService: ParkService,
    private sweetAlert: SweetAlertService) { }

  ngOnInit(): void {
    this.getPark();
    this.getMunicipios();
  }

  swhicheAccion() {
    switch (this.accion) {
      case "Modificar":
        this.updatePark();
        break;
      case "Agregar":
        this.insertPark();
        break;

      default:
        break;
    }
  }


  getPark() {
    this.parkService.getPark()
      .subscribe(response => {
        if (response.status) {
          this._park = this.parkService.park;
        }
      })
  }

  getMunicipios() {
    this.parkService.getMunicipios()
      .subscribe(response => {
        if (response.status) {
          this._municipios = this.parkService.municipios;
        }
      })
  }

  deletePark(park_id: string) {
    this.parkService.deletePark(park_id)
      .subscribe(response => {
        if (response.status) {
          this.sweetAlert.alertModal('success', response.message)
          this.getPark();
          this.form_park.reset();
          return response.status;
        }
        this.form_park.reset();
        this.sweetAlert.alertModal('error', "No se puede eliminar el parque porque tiene una dependencia y/o no existe")
        return response.status;
      })
  }

  selectPark(park_id: string) {
    this.accion = "Modificar";
    this.parkService.selectPark(park_id)
      .subscribe(response => {
        if (response.status) {
          this.sweetAlert.alertModal('success', response.message)
          this._parkSelected = response.data;
          this.setValuesInputsUpdate();
          return response.status;
        }
        this.sweetAlert.alertModal('error', "")
        console.log(response);

        return response.status;
      })
  }

  insertPark() {
    const { nombre_parques, direccion_parques,
      telefono_parques, codigo_municipios } = this.form_park.value;

    this.parkService.insertPark(nombre_parques, direccion_parques,
      telefono_parques, codigo_municipios)
      .subscribe((resp: any) => {
        if (resp.status == true) {
          this.sweetAlert.alertModal('success', resp.message)
          this.getPark();
          this.cancelar();
          return resp.status
        }

        this.sweetAlert.alertModal('error', resp.message)
        return resp.status
      })
  }

  setValuesInputsUpdate() {
    this.nameInputs.forEach(value => {
      this.form_park.controls[value].setValue(this._parkSelected[value])
    })
  }

  updatePark() {
    const { nombre_parques, direccion_parques,
      telefono_parques, codigo_municipios } = this.form_park.value;
    const codigo_parques = this._parkSelected.codigo_parques;

    this.parkService.updatePark(codigo_parques, nombre_parques, direccion_parques,
      telefono_parques, codigo_municipios)
      .subscribe((resp: any) => {
        if (resp.status == true) {
          this.sweetAlert.alertModal('success', resp.message)
          this.getPark();
          this.cancelar();
          return resp.status
        }

        this.sweetAlert.alertModal('error', resp.message)
        return resp.status
      })
  }

  cancelar() {
    this.form_park.reset();
    this.accion = "Agregar";
    this.sweetAlert.alertModal('info', 'Se han vaciado los campos del formulario')
  }

  isValid(campo: string) {
    return this.form_park.controls[campo].errors
      && this.form_park.controls[campo].touched;
  }

}
