import * as React from 'react';
import HistoryItem from './history-item';
import { connect } from 'react-redux';
import { CombinedState } from '../../redux/reducers';

interface StateToProps {
    items: Crunchyroll.HistoryItem[];
}

type HistoryListProps = StateToProps;

const HistoryListComp: React.StatelessComponent<HistoryListProps> = props => {
    return (
        <div className="ui items">
            {
                props.items.map(data => <HistoryItem key={data.timestamp} data={data} />)
            }
        </div>
    )
}

const HistoryList = connect<StateToProps, {}, {}, CombinedState>(state => {
    return {
        items: state.crunchyroll.items
    }
})(HistoryListComp);

export default HistoryList;