import { Action } from 'redux';
import { ActionType } from './actiontype';

export interface IAction extends Action<ActionType> {
    value?: any;
}