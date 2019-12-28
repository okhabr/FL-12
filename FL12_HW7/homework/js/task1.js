const USEREMAIL = prompt('Please provide your Email Address');
const KEYS = {
    'user@gmail.com': 'UserPass',
    'admin@gmail.com': 'AdminPass'
};
const MAILLENGTH = 5;
const PASSLENGTH = 6;

if (!USEREMAIL) {
    alert('Canceled');
} else if (USEREMAIL.length < MAILLENGTH) {
    alert(`I don't know any emails having name length less than 5 symbols`);
} else {
    if (USEREMAIL !== 'user@gmail.com'&& USEREMAIL !== 'admin@gmail.com') {
        alert('I don’t know you');
    } else {
        let userPassword = prompt('Please provide your password');
        if (!userPassword) {
            alert('Canceled');
        } else {
            if(userPassword!==KEYS[USEREMAIL]) {
                alert('Wrong password');
            } else {
                let passChangeConfirm = confirm('Do you want to change your password?');
                if(!passChangeConfirm){
                    alert('You have failed the change');
                } else {
                    let userOldPassword = prompt('Please provide your old password');
                    if (!userOldPassword) {
                        alert('Canceled');
                    } else {
                        if (userOldPassword!==KEYS[USEREMAIL]) {
                            alert('Wrong password');
                        } else {
                            let userNewPassword = prompt('Please provide your new password');
                            if (!userNewPassword){
                                alert('Canceled');
                            } else if (userNewPassword.length < PASSLENGTH) {
                                alert('It’s too short password. Sorry');
                            } else {
                                let userNewPasswordCheck = prompt('Please provide your new password again');
                                if (userNewPasswordCheck !== userNewPassword) {
                                    alert('You wrote the wrong password');
                                } else {
                                    alert('You have successfully changed your password');
                                }
                            }
                        }
                    }
                }
            } 
        }  
    }
}
