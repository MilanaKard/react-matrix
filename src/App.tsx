import React from 'react';
import Matrix from './components/matrix';

type AppState = {
    matrixHeight: number;
    matrixWidth: number;
    filterNumber: number;
    matrix: number[][];
    filteredMatrix: number[];
};

class App extends React.Component<object, AppState> {
    constructor(props: object) {
        super(props);
        this.state = {
            matrixHeight: 2,
            matrixWidth: 3,
            filterNumber: 10,
            matrix: [
                [0, 0, 0],
                [0, 0, 0],
            ],
            filteredMatrix: [],
        };
        this.onChange = this.onChange.bind(this);
        this.onColumnsChange = this.onColumnsChange.bind(this);
        this.onRowsChange = this.onRowsChange.bind(this);
        this.onFilterNumberChange = this.onFilterNumberChange.bind(this);
    }

    onChange(data: { value: number; row: number; column: number }) {
        const { value, row, column } = data;
        const matrix = [...this.state.matrix];
        matrix[row][column] = value;
        const filteredMatrix = matrix.flat().filter((element) => element > this.state.filterNumber);
        this.setState(() => ({
            matrix,
            filteredMatrix,
        }));
    }

    onRowsChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const rows = Number(ev.target.value);
        const matrix = [...this.state.matrix];
        if (rows > this.state.matrixHeight) {
            for (let i = this.state.matrixHeight; i < rows; i++) {
                matrix.push(Array(this.state.matrixWidth).fill(0));
            }
        }
        if (rows < this.state.matrixHeight) {
            matrix.splice(rows, matrix.length);
        }
        console.log(matrix);
        const filteredMatrix = matrix.flat().filter((element) => element > this.state.filterNumber);
        this.setState({ matrixHeight: rows, matrix, filteredMatrix });
    }

    onColumnsChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const columns = Number(ev.target.value);
        const matrix = [...this.state.matrix];
        if (columns > this.state.matrixWidth) {
            matrix.forEach((row) => row.push(...Array(columns - this.state.matrixWidth).fill(0)));
        }
        if (columns < this.state.matrixWidth) {
            matrix.forEach((row) => row.splice(this.state.matrixWidth - 1, row.length));
        }
        console.log(matrix);
        const filteredMatrix = matrix.flat().filter((element) => element > this.state.filterNumber);
        this.setState({ matrixWidth: columns, matrix, filteredMatrix });
    }

    onFilterNumberChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const filterNumber = Number(ev.target.value);
        const filteredMatrix = this.state.matrix.flat().filter((element) => element > filterNumber);
        this.setState({ filterNumber, filteredMatrix });
    }

    render() {
        const { matrixHeight, matrixWidth, filterNumber } = this.state;
        return (
            <>
                <h1>Матрица</h1>
                <label htmlFor="matrix-rows-input" className="label">
                    Число строк:
                </label>
                <input type="number" id="matrix-rows-input" onChange={this.onRowsChange} value={matrixHeight} />
                <label htmlFor="matrix-columns-input" className="label">
                    Число колонок:
                </label>
                <input type="number" id="matrix-columns-input" onChange={this.onColumnsChange} value={matrixWidth} />
                <Matrix columns={this.state.matrixWidth} rows={this.state.matrixHeight} onChange={this.onChange} />
                <label htmlFor="filter-number-input" className="label">
                    Найти числа большие:
                </label>
                <input
                    type="number"
                    id="filter-number-input"
                    onChange={this.onFilterNumberChange}
                    value={filterNumber}
                />
                <p>
                    {this.state.filteredMatrix.length
                        ? `В матрице ${this.state.filteredMatrix.length} элементов больше ${
                              this.state.filterNumber
                          }: ${this.state.filteredMatrix.join(' ')}`
                        : `В матрице A нет элементов больше ${this.state.filterNumber}`}
                </p>
            </>
        );
    }
}

export default App;
