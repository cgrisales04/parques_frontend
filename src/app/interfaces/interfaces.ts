export interface Parque {
    codigo_parques: string
    nombre_parques: string
    direccion_parques: string
    telefono_parques: number
    codigo_municipios: number
}


export interface ResponseGetHttp {
    status: boolean,
    data: Parques
}


export interface Parques extends Array<Parque> { }