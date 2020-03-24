class Component {
    constructor (employee){
    this.id = employee.id;
    this.rm_id = employee.rm_id;
    this.name = employee.name;
    this.performance = employee.performance;
    this.last_vacation_date = employee.last_vacation_date;
    this.salary = employee.salary;
    }
}

export class Employee extends Component{
    constructor(employee){
        super(employee);
    }
}

export class Manager extends Component {
    constructor(employee){
        super(employee);
        this.pool_name = employee.pool_name;
        this.employees = [];
    }

    add(employee){
        this.employees.push(employee);
    }

    getPoolSalary(){
       return this.employees
        .map(employee => employee.salary)
        .reduce((a,b) => a + b, this.salary);
    }

    getEmployeesCount(){
        let count = 1;
        this.employees
        .map(employee => { 
            if(employee instanceof Manager) {
                count += employee.getEmployeesCount();
                count -= 1;
            } 
            count += 1;
        })
        return count;
    }

    getDamnEmployees(){
        let badGuys = [];
        this.employees.forEach(employee => {
            if (employee.performance === 'low' && employee.salary > 1000) {
                badGuys.push(employee);
            }
            if (employee instanceof Manager) {
                badGuys.push(...employee.getDamnEmployees());
            }
        })
        return badGuys;
    }

    getAccumulatedPoolSalary(){
        return this.employees
        .map(employee => { 
            if(employee instanceof Manager) {
                return employee.getAccumulatedPoolSalary();
            } 
            return employee.salary;
        })
        .reduce((a,b) => a + b, this.salary);
    }
}