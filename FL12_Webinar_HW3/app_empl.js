//Task 2
class Employee {
    constructor(obj) {
        this.id = obj.id;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.birthday = obj.birthday;
        this.salary = obj.salary;
        this.position = obj.position;
        this.department = obj.department;
        Employee._setEMPLOYEES(this);
    }
    get age() {
        return (new Date().getFullYear()) - (new Date(this.birthday)).getFullYear();
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    _removeEmployee(message) {
        //Check if this employee is still in our register
        if (Employee._EMPLOYEES.includes(this)) {
            //Find index of employee in the register
            let indexToDelete = Employee._EMPLOYEES.findIndex((empl) => empl.id == this.id);
            if (indexToDelete === -1) return;
            //Update our register
            Employee._EMPLOYEES.splice(indexToDelete,1);
            if (message) {
                console.log(message);
            }
        } else {
            console.log('Sorry, but this employee doesn`t work here anymore!')
        }
    }  
    quit() {
        this._removeEmployee();
    }
    retire() {
        if (this.age >= 60) {
            this._removeEmployee(`It was such a pleasure to work with you!`);
        } else {
            console.log('Not yet, bro!')
        }
    }
    getFired()  {
        this._removeEmployee(`Not a big deal!`);
    }
    changeDepartment(newDepartment) {
        this.department = newDepartment;
    }
    changePosition(newPosition) {
        this.position = newPosition;
    }
    changeSalary(newSalary) {
        this.salary = newSalary;
    }
    getPromoted(obj){
        this.changeConditions(obj);
        console.log(`Yoohooo!`);
    }
    getDemoted(obj){
        this.changeConditions(obj);
        console.log(`Damn!`);
    }
    changeConditions(benefitsObj) {
        if (benefitsObj.position) {
            this.changePosition(benefitsObj.position);
        }
        if (benefitsObj.salary) {
            this.changeSalary(benefitsObj.salary);
        }
        if (benefitsObj.department) {
            this.changeDepartment(benefitsObj.department);
        }
    }

    //Register of employees
    static _EMPLOYEES = [];
    static _setEMPLOYEES (employee) {
        Employee._EMPLOYEES.push(employee);
    }
    static get EMPLOYEES() {
        return this._EMPLOYEES;
    } 
}

class BlueCollarWorker extends Employee {}

class Manager extends Employee {
    constructor(obj) {
        super(obj);
        this.position = 'manager';
    }
    get managedEmployees(){
        return Employee._EMPLOYEES.filter( employee => employee.department === this.department &&  employee.position !== 'manager');
    }
}

class HRManager extends Manager {
    constructor(obj) {
        super(obj);
        this.department = 'hr';
    }
}

class SalesManager extends Manager {
    constructor(obj) {
        super(obj);
        this.department = 'sales';
    }
}

//Task 3

//Reviews salary of managed employees
const reviewer = (manager) => ({
    reviewSalary (employeeId, newSalary) {
        //Find employee in managed employees
        let promotedEmployee = manager.managedEmployees.find((employee) => employee.id === employeeId);

        if (!promotedEmployee) return;
        //Review his salary
        promotedEmployee.changeSalary(newSalary);
        console.log(`You reviewed salary of ${promotedEmployee.fullName}`);
    }
})

//Changes position/salary/department of managed employees
const promoter = (manager) => ({
    promote (employeeId, benefitsObj) {
        //Find employee in managed employees
        let promotedEmployee = manager.managedEmployees.find((employee) => employee.id === employeeId);

        if (!promotedEmployee) return;
        //Review his salary
        promotedEmployee.getPromoted(benefitsObj);
        console.log(`You promoted ${promotedEmployee.fullName}`);
    }
})

//Fire managed employee
const badBoss = (manager) => ({
    fire (employeeId) {
        //Find employee in managed employees
        let firedEmployee = manager.managedEmployees.find((employee) => employee.id === employeeId);

        if (!firedEmployee) return;
        //Fire
        firedEmployee.getFired();
        console.log(`You fired ${firedEmployee.fullName}`);
    }
})

//Gives extra abilities to the manager
function ManagerPro(manager){
    return Object.assign(manager,
                        reviewer(manager), 
                        promoter(manager),
                        badBoss(manager))
}