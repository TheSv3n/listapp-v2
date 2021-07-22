import React from "react";

const SubItem = ({ listItemId, subItem }) => {
  const completeError = "";
  const handleChecked = () => {};
  const handleInfoToggle = () => {};
  const handleDelete = () => {};
  return (
    <>
      <li
        className={
          subItem.completed
            ? "list-group-item list-group-item-done d-flex text-center my-1 my-md-2 my-lg-2 col-11 ml-auto mr-1"
            : "list-group-item d-flex text-center my-1 my-md-2 my-lg-2 col-11 ml-auto mr-3"
        }
      >
        <div className="container-fluid text-center ">
          <div className="row">
            <div className="icon-span text-warning col-2 mx-auto col-lg-1 d-inline">
              <i
                className="fas icon fa-info-circle d-inline"
                onClick={() => {
                  handleInfoToggle();
                }}
              />

              {completeError ? (
                <>
                  <i
                    className="fas fa-exclamation-triangle text-danger ml-1 d-inline"
                    onClick={() => {
                      handleInfoToggle();
                    }}
                  />{" "}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="col-7 mx-auto">{subItem.name}</div>

            <div>
              <div className="d-inline col-1">
                <span
                  className="icon-span mr-3"
                  onClick={() => {
                    handleChecked();
                  }}
                >
                  <i
                    className={
                      subItem.completed
                        ? "text-danger fas fa-undo-alt icon"
                        : "text-success fas fa-check icon"
                    }
                  />{" "}
                </span>{" "}
              </div>

              <span
                onClick={() => {
                  handleDelete();
                }}
                className="icon-span text-danger col-1 mx-auto col-lg-1 d-none d-lg-inline d-md-inline"
              >
                <i className="fas fa-trash-alt icon" />
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default SubItem;
