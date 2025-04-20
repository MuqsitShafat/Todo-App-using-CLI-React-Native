import { getAuth } from '@react-native-firebase/auth';

const auth = getAuth();

export const register_user = async (email, password, name) => {
  try {
    const userCredentials = await auth.createUserWithEmailAndPassword(email, password);
    await userCredentials.user.updateProfile({
      displayName: name,
    });
    await userCredentials.user.sendEmailVerification();
    return userCredentials.user;
  } catch (error) {
    let errormessage;
    switch (error.code) {
      case 'auth/email-already-in-use':
        errormessage = 'This email is already in use.';
        break;
      case 'auth/invalid-email':
        errormessage = 'The email address is not valid.';
        break;
      case 'auth/weak-password':
        errormessage = 'Password is too weak. Must be at least 6 characters.';
        break;
      case 'auth/operation-not-allowed':
        errormessage = 'Email/password accounts are not enabled.';
        break;
      case 'auth/too-many-requests':
        errormessage = 'Too many attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errormessage = 'Network error. Please check your internet connection.';
        break;
      case 'auth/missing-email':
        errormessage = 'Email is required.';
        break;
      case 'auth/internal-error':
        errormessage = 'Something went wrong. Try again later.';
        break;
      default:
        errormessage = 'An unexpected error occurred. Try again.';
        break;
    }
    throw new Error(errormessage);
  }
};

export const signin_user = async (email, password) => {
  try {
    const userCredentials = await auth.signInWithEmailAndPassword(email, password);
    return userCredentials.user;
  } catch (error) {
    let errormessage;
    switch (error.code) {
      case 'auth/invalid-email':
        errormessage = 'The email address is invalid.';
        break;
      case 'auth/user-disabled':
        errormessage = 'This account has been disabled. Contact support.';
        break;
      case 'auth/user-not-found':
        errormessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errormessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/too-many-requests':
        errormessage = 'Too many attempts. Try again later.';
        break;
      case 'auth/network-request-failed':
        errormessage = 'Network error. Please check your internet.';
        break;
      case 'auth/internal-error':
        errormessage = 'Something went wrong. Try again.';
        break;
      case 'auth/operation-not-allowed':
        errormessage = 'Email/password login is not enabled.';
        break;
      default:
        errormessage = 'Login failed. Please try again.';
    }
    throw new Error(errormessage);
  }
};

export const reset_password = async email => {
  try {
    await auth.sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    let errormessage;
    switch (error.code) {
      case 'auth/invalid-email':
        errormessage = 'Type Correct format.';
        break;
      case 'auth/user-not-found':
        errormessage = 'No account found with this email.';
        break;
      case 'auth/too-many-requests':
        errormessage = 'Too many attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errormessage = 'Network error. Please check your internet connection.';
        break;
      default:
        errormessage = 'An unknown error occurred. Please try again.';
        break;
    }
    throw new Error(errormessage);
  }
};

export const sign_out = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    let errormessage;
    switch (error.code) {
      case 'auth/no-current-user':
        errormessage = 'No user is currently signed in.';
        break;
      case 'auth/network-request-failed':
        errormessage = 'Network error. Please check your internet connection.';
        break;
      case 'auth/internal-error':
        errormessage = 'An internal error occurred. Please try again.';
        break;
      default:
        errormessage = 'An unknown error occurred while signing out.';
        break;
    }
    throw new Error(errormessage);
  }
};
