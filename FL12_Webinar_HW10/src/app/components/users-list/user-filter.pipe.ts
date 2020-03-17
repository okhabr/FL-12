import {PipeTransform, Pipe} from '@angular/core';
import {User} from '../../interfaces/user';

@Pipe({
    name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {
    transform(users: User[], searchTerm: string): User[]{
        if( !users || !searchTerm) {
            return users;
        }
        return users.filter( user =>
            user['name'].toLowerCase().includes(searchTerm.toLowerCase()));
    }
}
