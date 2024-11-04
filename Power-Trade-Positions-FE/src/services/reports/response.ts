export interface IReportItem {
  id: string,
  name: string,
  reportDate: string,
  triggerDateUTC: string,
  type: string
}

export interface IReportDetail extends IReportItem {
  powerVolumes: PowerVolumesByPeriod[]
}

export interface PowerVolumesByPeriod {
  periodTime: Date,
  volume: number
}