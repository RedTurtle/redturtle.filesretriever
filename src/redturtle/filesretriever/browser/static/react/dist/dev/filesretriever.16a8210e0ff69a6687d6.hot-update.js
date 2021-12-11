webpackHotUpdate("filesretriever",{

/***/ "./src/redturtle/filesretriever/browser/static/react/javascripts/filesretriever/FilesListWrapper/index.jsx":
/*!*****************************************************************************************************************!*\
  !*** ./src/redturtle/filesretriever/browser/static/react/javascripts/filesretriever/FilesListWrapper/index.jsx ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-data-table-component */ "./node_modules/react-data-table-component/dist/index.cjs.js");
/* harmony import */ var react_data_table_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_data_table_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _TranslationsContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../TranslationsContext */ "./src/redturtle/filesretriever/browser/static/react/javascripts/TranslationsContext.js");
/* harmony import */ var _ApiContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../ApiContext */ "./src/redturtle/filesretriever/browser/static/react/javascripts/ApiContext.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/redturtle/filesretriever/browser/static/react/javascripts/filesretriever/utils.js");
/* harmony import */ var _TitleRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TitleRow */ "./src/redturtle/filesretriever/browser/static/react/javascripts/filesretriever/TitleRow/index.jsx");
/* harmony import */ var react_tooltip__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.es.js");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./index.less */ "./src/redturtle/filesretriever/browser/static/react/javascripts/filesretriever/FilesListWrapper/index.less");
/* harmony import */ var _index_less__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_index_less__WEBPACK_IMPORTED_MODULE_7__);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }










var FilesListWrapper = function FilesListWrapper() {
  var getTranslationFor = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_TranslationsContext__WEBPACK_IMPORTED_MODULE_2__["TranslationsContext"]);
  var labels = Object(_utils__WEBPACK_IMPORTED_MODULE_4__["getTranslations"])(getTranslationFor);

  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false),
      _useState2 = _slicedToArray(_useState, 2),
      toggleCleared = _useState2[0],
      setToggleCleared = _useState2[1];

  var _React$useState = react__WEBPACK_IMPORTED_MODULE_0___default.a.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selectedRows = _React$useState2[0],
      setSelectedRows = _React$useState2[1];

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_ApiContext__WEBPACK_IMPORTED_MODULE_3__["ApiContext"]),
      data = _useContext.data,
      loading = _useContext.loading,
      updateTextRow = _useContext.updateTextRow,
      saveFiles = _useContext.saveFiles; //------------------COLUMNS----------------------


  var StatusCell = function StatusCell(row) {
    var statusIcon = '';

    if (row.created === true) {
      statusIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "glyphicon glyphicon-ok-sign success"
      });
    } else if (row.created === false) {
      statusIcon = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "glyphicon glyphicon-alert error",
        "data-tip": row.error
      });
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "status"
    }, statusIcon, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tooltip__WEBPACK_IMPORTED_MODULE_6__["default"], {
      place: "bottom",
      type: "dark",
      effect: "solid"
    }));
  };

  var columns = [{
    name: labels.url,
    cell: function cell(row) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: row.href,
        target: "_blank",
        rel: "noopener noreferrer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "glyphicon glyphicon-link",
        "data-tip": row.href
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_tooltip__WEBPACK_IMPORTED_MODULE_6__["default"], {
        place: "bottom",
        type: "dark",
        effect: "solid"
      }));
    },
    width: '80px'
  }, {
    name: labels.title,
    cell: function cell(row, index) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TitleRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
        row: row,
        index: index,
        updateTextRow: updateTextRow
      });
    }
  }, {
    name: labels.status,
    cell: StatusCell,
    width: '100px'
  }]; //------------------ACTIONS----------------------

  var handleRowSelected = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(function (state) {
    setSelectedRows(state.selectedRows);
  }, []);
  var contextActions = react__WEBPACK_IMPORTED_MODULE_0___default.a.useMemo(function () {
    var handleSave = function handleSave() {
      // eslint-disable-next-line no-alert
      if (window.confirm("".concat(labels.saveConfirm, " \n").concat(selectedRows.map(function (r) {
        return '> ' + r.text;
      }).join('\n')))) {
        var params = {
          urls: selectedRows
        };
        saveFiles({
          endpoint: 'save-files',
          params: params,
          method: 'POST'
        });
        setToggleCleared(!toggleCleared);
      }
    };

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      key: "save",
      onClick: handleSave,
      className: "plone-btn plone-btn-info"
    }, labels.save);
  }, [selectedRows, toggleCleared]); //------------------TABLE----------------------

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "files-list"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_data_table_component__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: labels.tableTitle,
    columns: columns,
    data: data.links,
    striped: true,
    highlightOnHover: true,
    pointerOnHover: false,
    noDataComponent: labels.noFiles,
    responsive: true,
    progressPending: loading,
    selectableRows: true,
    onSelectedRowsChange: handleRowSelected,
    clearSelectedRows: toggleCleared,
    selectableRowDisabled: function selectableRowDisabled(row) {
      return row.created === true;
    },
    contextActions: contextActions,
    contextMessage: {
      singular: labels.singularSelected,
      plural: labels.pluralSelected,
      message: ''
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (FilesListWrapper);

/***/ })

})
//# sourceMappingURL=filesretriever.16a8210e0ff69a6687d6.hot-update.js.map