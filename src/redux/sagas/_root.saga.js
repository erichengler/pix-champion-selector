import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import championSaga from './champion.saga';
import favoriteSaga from './favorite.saga';
import noteSaga from './note.saga';
import blacklistSaga from './blacklist.saga';
import championInfoSaga from './championInfo.saga';

export default function* rootSaga() {
	yield all([
		loginSaga(),
		registrationSaga(),
		userSaga(),
		championSaga(),
		favoriteSaga(),
		noteSaga(),
		blacklistSaga(),
		championInfoSaga(),
	]);
}
