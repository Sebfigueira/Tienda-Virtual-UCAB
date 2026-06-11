export class UserModel {
    constructor() { this.users = JSON.parse(localStorage.getItem('users')) || []; this.currentUser = JSON.parse(localStorage.getItem('curr_user')); }
    register(e, p) { this.users.push({e, p}); localStorage.setItem('users', JSON.stringify(this.users)); }
    login(e, p) { 
        const u = this.users.find(x => x.e === e && x.p === p);
        if(u) { this.currentUser = u; localStorage.setItem('curr_user', JSON.stringify(u)); return true; }
        return false;
    }
    logout() { this.currentUser = null; localStorage.removeItem('curr_user'); }
}
