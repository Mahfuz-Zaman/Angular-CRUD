import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent implements OnInit {
  id: string = '';
  name = new FormControl('');
  phone = new FormControl('');

  constructor(
    private router: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.router.snapshot.params['id'];
    console.log(userId);
    this.userService.getSingleUser(userId).subscribe((response) => {
      this.id = response.data.id;
      this.name.setValue(response.data.name);
      this.phone.setValue(response.data.phoneNo);
    });
  }

  onSubmit() {
    const updatedUser = {
      id: this.id,
      name: this.name.value,
      phoneNo: this.phone.value,
    };
    this.userService
      .editUser(updatedUser)
      .subscribe((data) => console.log(data));
    this.name.reset();
    this.phone.reset();
  }
}
