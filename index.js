// Your code here
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (array) => {
    let employeeArray = []
    for(let i=0; i<array.length; i++){
        let data = createEmployeeRecord(array[i])
        employeeArray.push(data)
    }
    return employeeArray
}

function createTimeInEvent(employeeRecord, timeStamp) {
    const hour = parseInt(timeStamp.split(" ")[1])
    const date = timeStamp.split(" ")[0]
    const timeObj = {
        type: "TimeIn",
        hour: hour,
        date: date
    }
    employeeRecord["timeInEvents"].push(timeObj)
    return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, timeStamp) => {
    const hour = parseInt(timeStamp.split(" ")[1])
    const date = timeStamp.split(" ")[0]
    const timeObj = {
        type: "TimeOut",
        hour: hour,
        date: date
    }
    employeeRecord["timeOutEvents"].push(timeObj)
    return employeeRecord;
}

const hoursWorkedOnDate = (employeerecord, date) => {
    const timeIn = getHours(employeerecord.timeInEvents, date)
    const timeOut = getHours(employeerecord.timeOutEvents, date)
    return (timeOut - timeIn) / 100
}

function getHours(array, date){
    for(let i=0; i<array.length; i++) {
        if(array[i].date === date){
            return array[i].hour
        }
    }
}

const wagesEarnedOnDate = (employeeRecord, date) => {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const rate = employeeRecord.payPerHour
    return hoursWorked * rate
}

const allWagesFor = (employeeObj) =>{
    let events = employeeObj.timeInEvents
    let wagesArray = []
    events.forEach(event => {
        const date = event.date
        const wage = wagesEarnedOnDate(employeeObj, date)
        wagesArray.push(wage)
    });

    const total = wagesArray.reduce((a,b) => a+b)
    return total
}

const calculatePayroll = (employeesArr) =>{
    let totals = []
    employeesArr.forEach(employeeObj => {
        let pay = allWagesFor(employeeObj)
        totals.push(pay)
    })
    let grandTotal = totals.reduce((a,b) => a+b)
    return grandTotal
}