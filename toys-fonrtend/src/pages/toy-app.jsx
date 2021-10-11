import React from 'react'
import { connect } from 'react-redux'
import { socketService } from '../services/socket.service'
import { loadToys, onAddToy, onEditToy, onRemoveToy, addToCart } from '../store/toy.actions'
import { showSuccessMsg } from '../services/event-bus.service'
import { ToyList } from '../cmps/toy-list'
import { FilterToys } from '../cmps/filter-toy'
import { Box, Button, Fade } from '@material-ui/core'

import noResultImg from '../assets/img/magnify.png'
import { Loader } from '../cmps/laoder'
import { Login } from './login'
import BasicModal from '../cmps/modal'
import { AddToy } from '../cmps/add-toy'

class _ToyApp extends React.Component {
    state = {
        isOpen: false
    }
    componentDidMount() {
        this.props.loadToys()
        socketService.on('toy update', (savedToy) => {
            this.props.loadToys()
            showSuccessMsg('Toy update by Admin')

        })

    }

    onSetFilter = (filterBy) => {
        this.props.loadToys(filterBy)
    }

    onRemoveToy = (toyId) => {
        this.props.onRemoveToy(toyId)
    }

    onAddToy = (toy) => {
        this.props.onAddToy(toy)
    }
    onEditToy = (toy) => {
        const price = +prompt('New price?')
        const toyToSave = { ...toy, price }
        this.props.onEditToy(toyToSave)
    }
    addToToy = (toy) => {
        console.log(`Adding ${toy.vendor} to Toyt`)
        this.props.addToToyt(toy)
        showSuccessMsg('Added to Toyt')
    }
    render() {
        const { toys, isLoading } = this.props
        const { isOpen } = this.state
        if (!toys) return <Loader />
        return (
            <div>
                <main className="main-app main-container">
                    <FilterToys filterToys={this.onSetFilter} />
                    <Box m={2} >
                        <BasicModal titile="Add Toy">
                            <AddToy onAddToy={this.onAddToy} />
                        </BasicModal>
                    </Box>
                    {isLoading && <Loader />}
                    {!toys.length && !isLoading &&
                        <section className="flex justify-center">
                            <img src={noResultImg} alt="No Result" className="no-result" />
                        </section>}
                    <ToyList toys={toys} onDeleteToy={this.onRemoveToy} />
                </main>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        toys: state.toyModule.toys,
        isLoading: state.toyModule.isLoading,
    }
}
const mapDispatchToProps = {
    loadToys,
    onRemoveToy,
    onAddToy,
    onEditToy,
    addToCart
}


export const ToyApp = connect(mapStateToProps, mapDispatchToProps)(_ToyApp)