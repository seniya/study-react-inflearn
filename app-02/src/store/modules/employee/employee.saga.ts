import { takeEvery, call, put } from 'redux-saga/effects';
import { apiEmployees } from './employee.api';
import { FETCH_EMPLOYEES } from './employee.reducer';

function* fetch() {
  try {
    const employees = yield call(apiEmployees);
    yield put({ type: FETCH_EMPLOYEES.SUCCESS, payload: { employees: employees.data } });
  } catch (e) {
    yield put({ type: FETCH_EMPLOYEES.FAILURE, payload: { message: e.message } });
  }
}

export default [takeEvery(FETCH_EMPLOYEES.REQUEST, fetch)];
