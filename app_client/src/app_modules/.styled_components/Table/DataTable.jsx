import React, { PureComponent } from "react";
import styled from "styled-components";
import classnames from "classnames";

import { Link } from "react-router-dom";
import Row from "./Row";
import Datum from "./Datum";
import Title from "./Title";
import Header from "./Header";
import Search from "./Search";
import Footer from "./Footer";
import { ArrowDropDownIcon } from "@images/svg-icons/ArrowDropDown";

/*
 * The user of the table is responsible for passing in a unique key for each
 * object in props.data
 */

const TitleSortContainer = styled.div`
  position: relative;
  height: 15px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: ${({ numerical }) =>
    numerical ? "flex-end" : "flex-start"};
  > .sortButton {
    position: absolute;
    right: -15px;
    height: 15px;
    width: 15px;
    cursor: pointer;
    border-radius: 7.5px;
    margin-left: 5px;
    fill: ${props => props.theme.default};
    transform-origin: center;
    transition: 0.3s;
    cursor: pointer;
  }

  > .sortButton:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  > .rotate {
    transform: rotate(180deg);
  }
`;

const MessageComponent = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  width: 40em;
  max-width: 100%;
  margin: 50px auto;
  padding: 40px 60px;
  &.has-error {
    color: ${props => props.theme.error};
  }
`;

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sortedBy: null,
      descending: undefined
    };

    // this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    // document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    // document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    let mainTable = this.table;
    let tableHeight = mainTable.offsetHeight;
    if (tableHeight > 500) {
      let fauxTable = this.faux;

      // document.querySelector(".table-wrapper").className += " " + "fixed";
      let clonedElement = mainTable.cloneNode(true);
      // clonedElement.id = "";
      fauxTable.appendChild(clonedElement);
    }
  }

  sortBy = key => {
    this.setState(prevState => {
      let { sortedBy, descending } = prevState;

      if (key === sortedBy) {
        // flip descending or ascending
        key = descending ? "" : key;
        descending = !descending;
      } else {
        // default, new sort to descending
        descending = false;
      }

      // Run either custom or built in sorter
      if (this.props.onSort) {
        this.props.onSort(key, descending);
      }

      return {
        descending,
        sortedBy: key
      };
    });
  };

  getDatum(key, datum) {
    if (key === "actions") {
      return datum.actions;
    }

    if (!!datum.link) {
      return <Link to={datum.link}>{datum[key]}</Link>;
    } else {
      return <span className="table-datum">{datum[key]}</span>;
    }
  }

  renderSticky() {
    const { fields } = this.props;
    const { sortedBy, descending } = this.state;

    const component = (
      <React.Fragment>
        {fields.map(({ label, numerical, key, sortable, width }, i) => (
          <Title
            sortedBy={this.state.sortedBy === key}
            key={label}
            column={key}
            numerical={numerical}
            first={i === 0}
            last={i === fields.length - 1}
            width={width}
          >
            {key === "actions" && !!this.props.renderMenu ? (
              this.props.renderMenu()
            ) : (
              <TitleSortContainer numerical={numerical}>
                {label}
                &nbsp;
                {sortable && (
                  <ArrowDropDownIcon
                    className={classnames("sortButton", {
                      rotate: key == sortedBy && descending
                    })}
                    onClick={() => this.sortBy(key)}
                    fill="rgba(0, 0, 0, .54)"
                    size={15}
                    size={15}
                  />
                )}
              </TitleSortContainer>
            )}
          </Title>
        ))}
      </React.Fragment>
    );
    return component;
  }

  render() {
    const { fields, data, header, onSearch, status, message } = this.props;

    return (
      <div className={`table-wrapper ${this.props.className}`}>
        {!!header || !!onSearch ? (
          <div className="table-top">
            {header && <Header>{header}</Header>}
            {onSearch && (
              <div className="table-search">
                <Search onSearch={onSearch} reverse />
              </div>
            )}
          </div>
        ) : null}
        <div className="faux-table" ref={faux => (this.faux = faux)} />
        <table className="table-table" ref={table => (this.table = table)}>
          <thead className="table-head" ref={fixed => (this.fixed = fixed)}>
            <Row header>{this.renderSticky()}</Row>
          </thead>

          {!!data && data.length > 0 && status != "error" && (
            <tbody>
              {data.map(({ actions: DatumActions, datumStyle, ...datum }) => {
                return (
                  <Row key={`row_${datum.id}`} rowStyle={datum.rowStyle}>
                    {fields.map(({ key, numerical }, i) => (
                      <Datum
                        {...datum}
                        key={`{${datum.id}_${key}}`}
                        column={key}
                        datumStyle={datumStyle ? datumStyle[key] : ""}
                        numerical={numerical}
                        link={datum.link}
                        first={i === 0}
                        last={i === fields.length - 1}
                      >
                        {key === "actions" && !!DatumActions
                          ? DatumActions
                          : this.getDatum(key, datum)}
                      </Datum>
                    ))}
                  </Row>
                );
              })}
            </tbody>
          )}
        </table>

        {!!data && !data.length && status != 'loaded' && (
          <MessageComponent>No template found.</MessageComponent>
        )} 

        {this.props.paginated && status != 'error' && <Footer onPaginate={this.props.onPaginate} />}

        {status == 'error' && (<MessageComponent className='has-error'>{message}</MessageComponent>)}
      </div>
    );
  }
}

export default styled(Table)`
  ${props => (props.fullWidth ? "width: 100%" : "")};
  display: inline-block;
  overflow: hidden;
  background-color: #fff;
  border-radius: 3px;
  border-spacing: 0;
  border: 0px;

  > .table-top {
    display: flex;
    padding: 22px 32px 0 32px;
    justify-content: ${props => props.header ? 'space-between' : 'flex-end'};
    align-items: baseline;
  }

  > .table-search {
    border-bottom: 1px solid rgba(225, 225, 225, 1);
  }

  > .table-table {
    border-collapse: collapse;
    table-layout: fixed;
    .table-datum {
      cursor: pointer;
    }
    tr {
      border: 0px;
      border-bottom: 1px solid rgba(225, 225, 225, 1);
    }

    ${props => (props.fullWidth ? "width: 100%" : "width: auto")};
    border-spacing: 0;
  }
`;
