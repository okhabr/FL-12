import React from 'react';
import './App.css';
import {Employee, Manager} from './EmployeeClasses';

class  App extends React.Component {
  constructor(){
    super();
    this.state = {
      startingPoint: {},
      tab: 1,
    }
    this.paintAll = this.paintAll.bind(this);
    this.showPoolsData = this.showPoolsData.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }


//Get and prepare data
async componentDidMount(){
  const employeesData = await fetch('https://roman4ak.github.io/fe-oop-lab/mocks/epms.json');
  let employees = await employeesData.json();
  
  let all = [];
  let managers = [];
  employees.forEach(employee => {
      if (employee.pool_name){
          const Boss = new Manager(employee);
          all.push(Boss);
          managers.push(Boss);
      } else {
          all.push(new Employee(employee));
      }
  })
  managers.forEach((manager) => {
      all.forEach( empl => {
          if (empl.rm_id === manager.id){
              manager.add(empl);
          }
      })
  });
  //Dummy boss as a starting point
  const BiggestBoss = new Manager({
    id: null,
    rm_id: null,
    salary: 0
  });
  BiggestBoss.add(all[0]);
  
  this.setState({startingPoint: BiggestBoss});
}

paintAll(boss){ 
  return (
    boss.employees.map( empl => {
      if (empl instanceof Manager) {
        return  (
        <ul key={empl.id}>
          <li>
            <p className="highlight red">ID: {empl.id} {empl.name}</p>  
            <ul key={empl.salary}>{this.paintAll(empl)}</ul>
          </li>
        </ul>
      )} else {
          return <li key={empl.id}>ID: {empl.id} {empl.name}</li>
      }
  })
  )
}

showPoolsData(boss){
  return (
    boss.employees.map( empl => {
      if (empl instanceof Manager) {
        return  (
        <ul key={empl.id}>
          <li>
            <div className="pool-info">
              <p className="highlight">{empl.pool_name} </p>
              <p>Pool manager: {empl.name} </p>
              <p>Pool budget: {empl.getPoolSalary()} </p>
              <p>Pool headcount: {empl.getEmployeesCount()} </p>
            </div>
            <div>{this.showPoolsData(empl)}</div>
          </li>
        </ul> 
      )}
    })
  )
}
showBadEmployees(boss){
  return boss.getDamnEmployees().map( employee => {
    return <li key={employee.id}> {employee.name} has salary {employee.salary} USD, took last vacation on {employee.last_vacation_date} </li>
  })
}

changeTab(e){
  this.setState({tab: +e.target.id})
}

render() {
  const boss = this.state.startingPoint;

  return (
    <div className="App">
      <button id="1" onClick={this.changeTab}>All Employees </button>
      <button id="2" onClick={this.changeTab}>All Units </button>
      <button id="3" onClick={this.changeTab}>Warning Employees</button>
      { boss.employees && this.state.tab === 1 && this.paintAll(boss)}
      { boss.employees && this.state.tab === 2 && this.showPoolsData(boss)}
      { boss.employees && this.state.tab === 3 && this.showBadEmployees(boss)}
    </div>
  );
}
}

export default App;
