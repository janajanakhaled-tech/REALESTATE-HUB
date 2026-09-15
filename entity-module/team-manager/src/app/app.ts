import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TeamMember {
  name: string;
  age: number;
  department: string;
  available: boolean;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  members: TeamMember[] = [
    {
      name: 'Ahmed',
      age: 28,
      department: 'Development',
      available: true
    },
    {
      name: 'Esraa',
      age: 24,
      department: 'Marketing',
      available: false
    },
    {
      name: 'Mariam',
      age: 26,
      department: 'Design',
      available: true
    }
  ];

  departments = [
    'All Departments',
    'Development',
    'Marketing',
    'Design'
  ];

  selectedDepartment = 'All Departments';

  viewMode = 'card';

  memberName = '';
  memberAge: number | null = null;
  memberDepartment = 'Development';
  memberAvailable = true;

  submitted = false;

  addMember() {
    this.submitted = true;

    if (
      this.memberName.trim() === '' ||
      this.memberAge === null ||
      this.memberAge <= 0
    ) {
      return;
    }

    this.members.push({
      name: this.memberName.trim(),
      age: this.memberAge,
      department: this.memberDepartment,
      available: this.memberAvailable
    });

    this.memberName = '';
    this.memberAge = null;
    this.memberDepartment = 'Development';
    this.memberAvailable = true;
    this.submitted = false;
  }

  toggleAvailability(member: TeamMember) {
    member.available = !member.available;
  }

  get filteredMembers() {
    if (this.selectedDepartment === 'All Departments') {
      return this.members;
    }

    return this.members.filter(
      member => member.department === this.selectedDepartment
    );
  }
} 