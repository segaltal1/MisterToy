import React from 'react'
import MultiSelect from 'react-select';
import PropTypes from 'prop-types';
import { FormControl, FormControlLabel, InputLabel, makeStyles, MenuItem, Select, Switch, TextField } from '@material-ui/core';

const options = [
    { value: 'On wheels', label: 'On wheels' },
    { value: 'Box Game', label: 'Box Game' },
    { value: 'Art', label: 'Art' },
    { value: 'Baby', label: 'Baby' },
    { value: 'Doll', label: 'Doll' },
    { value: 'Puzzle', label: 'Puzzle' },
];



export class FilterToys extends React.Component {
    state = {
        filter: {
            name: '',
            inStock: '',
            price: '',
            sortBy: '',
            labels: null
        },
        toggleControl: false
    }

    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState({ filter: { ...this.state.filter, [field]: value }, }, () => {
            this.props.filterToys(this.state.filter);
        });
    };

    handleChangeLabels = (labels) => {
        this.setState({ filter: { ...this.state.filter, labels, }, }, () => {
            // this.props.filterToys(this.state.filter);
            const labels = this.state.filter.labels.map(lb => lb.value)
            this.props.filterToys({ ...this.state.filter, labels: labels });
        });

    }

    useStyles = () => makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    toggleControl = () => {
        const toggle = !this.state.toggleControl
        this.setState({ toggleControl: toggle },)
    }

    render() {
        const { name, price, labels, sortBy } = this.state.filter;
        // const { selectedOption } = this.state;
        const classes = this.useStyles();

        return (
            < div className="filter-toy flex align-center  gap" >
                <section className="filter-top-row align-center flex">

                    <TextField
                        label="Price"
                        variant="outlined"
                        name='price'
                        id='price'
                        value={price}
                        onChange={this.handleChange}
                        type="number"
                        size="small"
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                    />
                    <FormControl className={classes.formControl} >
                        <InputLabel id="sort-by-label">SortBy</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            id="sort-by"
                            value={sortBy}
                            onChange={this.handleChange}
                            name='sortBy'
                        >
                            <MenuItem value={'price'}>price</MenuItem>
                            <MenuItem value={'name'}>Name</MenuItem>
                            <MenuItem value={'created'}>Created</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch />}
                        checked={this.state.toggleControl}
                        value={this.state.toggleControl ? '' : 'inStock'}
                        label="Stock"
                        name='inStock'
                        onClick={this.toggleControl}
                        onChange={this.handleChange}
                    />
                </section>

                < section className="multi-select flex gap align-center" >
                    <TextField
                        label="Search.."
                        variant="outlined"
                        name='name'
                        id='name'
                        value={name}
                        size="small"
                        onChange={this.handleChange}

                    />
                    < MultiSelect
                        value={labels}
                        closeMenuOnSelect={false}
                        onChange={this.handleChangeLabels}
                        isMulti
                        name="labels"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />

                </ section >
            </ div >
        )
    }

}



FilterToys.propTypes = {
    filterToys: PropTypes.func,
}
