import React from 'react'
import { BarChart, PieChart } from '../cmps/chart'
import { connect } from 'react-redux'
import { loadToys } from '../store/toy.actions'



export class _Dashboard extends React.Component {

    state = {

    }
    componentDidMount() {
        this.props.loadToys()
    }
    getToysByLabel = () => {
        let toys = this.props.toys
        const toysLabels = toys.map(toy => toy.labels).flat()
        const result = toysLabels.reduce((acc, label) => {
            acc[label] = acc[label] ? ++acc[label] : 1
            return acc
        }, {});
        return result
    }

    getToysByDate = () => {
        let toys = this.props.toys

        const toysDates = toys.map(toy => new Date(toy.createdAt).getMonth())

        // const toysDateMap = toysDates.reduce((acc, date) => {
        //     acc[date] = acc[date] ? ++acc[date] : 1
        //     return acc
        // }, {});
        const result = []
        for (let i = 0; i < 12; i++) {
            result.push(toysDates.filter(date => date === i).length)
        }
        // for (const key in toysDateMap) {
        //     const val = toysDateMap[key];
        //     result[key] = val
        // }
        return result
    }
    render() {
        return (
            <section className="toy-chart flex column align-center gap">
                <PieChart chartData={this.getToysByLabel()} />
                <BarChart chartData={this.getToysByDate()} />
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys
    }
}

const mapDispatchToProps = {
    loadToys,
}


export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(_Dashboard)
