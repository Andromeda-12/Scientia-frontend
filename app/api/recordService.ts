import instance from './instance'

export default class recordService {
  static getRecords = () => instance.get('/record')

  static getApprovedRecords = () =>
    instance.get('/record', { params: { isIssued: true, isReturned: false } })

  static getPendingConfirmation = () =>
    instance.get('/record', { params: { isIssued: false } })

  static getOverduedRecords = () =>
    instance.get('/record', { params: { isOverdue: true } })

  static getReturnedRecords = () =>
    instance.get('/record', { params: { isReturned: true } })

  static getUserRecords = () => instance.get('/record/myrecords')

  static approveRecord = (recordId: number) =>
    instance.post(`/record/${recordId}/issue`)

  static returnBook = (recordId: number) =>
    instance.post(`/record/${recordId}/return`)

  static rejectRecord = (recordId: number) =>
    instance.delete(`/record/${recordId}`)
}
