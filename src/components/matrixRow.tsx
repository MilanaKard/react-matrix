import React from 'react';
import MatrixCell from './matrixCell';

type MatrixRowProps = {
    row: number;
    columns: number;
    onChange: (data: { value: number; row: number; column: number }) => void;
};

class MatrixRow extends React.Component<MatrixRowProps> {
    render() {
        return (
            <div className="matrix-row">
                {[...Array(this.props.columns)].map((_, index) => (
                    <MatrixCell key={index} row={this.props.row} column={index} onChange={this.props.onChange} />
                ))}
            </div>
        );
    }
}

export default MatrixRow;
