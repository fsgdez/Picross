// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

// components
import Tile from './Tile';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// styles
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
`;

const TileGrid = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.templateColumns};
  border: 1px solid black;
`;

class PicrossGrid extends Component {
  props: {
    fillType: string,
    onTileChange: Function,
    playerGrid: Array,
    solutionGrid: Array,
    columnBounds: Array,
    rowBounds: Array,
  };

  getGridColumnSize = () => {
    return (this.props.playerGrid[0] || []).length;
  };

  // column bounds
  displayDirectionCounts = (type, bounds) => {
    return bounds.map((colArr, index) => {
      return (
        <Grid item key={index}>
          <Grid container direction={type} spacing={8}>
            {colArr.map((segment, segmentIndex) => {
              return (
                <Grid item key={`${index}-${segmentIndex}`}>
                  {segment}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      );
    });
  };

  // main grid
  displayGrid = () => {
    const els = [];
    const solution = this.props.solutionGrid;
    this.props.playerGrid.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        els.push(
          <Tile
            rowIndex={rowIndex}
            colIndex={colIndex}
            key={rowIndex + '-' + colIndex}
            onTitleChange={this.props.onTileChange}
            value={row[colIndex]}
            solution={solution[rowIndex][colIndex]}
          />,
        );
      });
    });
    return els;
  };

  render() {
    const numColumns = this.getGridColumnSize();
    return (
      <div>
        <GridContainer>
          <div />
          <Grid container justify="space-around" alignItems="flex-end">
            {this.displayDirectionCounts('column', this.props.columnBounds)}
          </Grid>
          <Grid
            container
            justify="space-around"
            alignItems="flex-end"
            direction="column"
          >
            {this.displayDirectionCounts('row', this.props.rowBounds)}
          </Grid>
          <Paper elevation={5}>
            <TileGrid templateColumns={`repeat(${numColumns}, auto)`}>
              {this.displayGrid()}
            </TileGrid>
          </Paper>
        </GridContainer>
      </div>
    );
  }
}

PicrossGrid.propTypes = {};

export default PicrossGrid;
