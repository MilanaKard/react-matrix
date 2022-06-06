import React from 'react';
import MatrixRow from './matrixRow';

type MatrixProps = {
    rows: number;
    columns: number;
    onChange: (data: { value: number; row: number; column: number }) => void;
};

class Matrix extends React.Component<MatrixProps> {
    render() {
        return (
            <div className="matrix">
                {[...Array(this.props.rows)].map((_, index) => (
                    <MatrixRow key={index} row={index} columns={this.props.columns} onChange={this.props.onChange} />
                ))}
            </div>
        );
    }
}

export default Matrix;
