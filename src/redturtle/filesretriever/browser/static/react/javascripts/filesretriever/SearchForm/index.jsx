import React, { useState, useContext } from 'react';
import { TranslationsContext } from '../../TranslationsContext';
import { getTranslations } from '../utils';

import './index.less';

const SearchForm = ({ onSubmit }) => {
  const [url, setUrl] = useState(
    'https://www.comune.bibbiano.re.it/servizi/Menu/dinamica.aspx?idSezione=28856&idArea=28280&idCat=28332&ID=28332&TipoElemento=categoria',
  );
  const [cssClass, setCssClass] = useState('');
  const [cssId, setCssId] = useState('formid_centro');
  const getTranslationFor = useContext(TranslationsContext);
  const labels = getTranslations(getTranslationFor);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ url, class: cssClass, id: cssId });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="field">
        <label className="horizontal">
          {labels.urlLabel}
          {' - '}
          <span className="formHelp">{labels.urlHelp}</span>
          <input
            type="text"
            size="100"
            value={url}
            onChange={e => {
              setUrl(e.target.value);
            }}
          />
        </label>
      </div>
      <div className="css-filters">
        <div className="css-field">
          <label className="horizontal">
            {labels.cssClassLabel} {' - '}
            <span className="formHelp">{labels.cssClassHelp}</span>
            <input
              type="text"
              value={cssClass}
              onChange={e => {
                setCssClass(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="css-field">
          <label className="horizontal">
            {labels.cssClassLabel} {' - '}
            <span className="formHelp">{labels.cssClassHelp}</span>
            <input
              type="text"
              value={cssId}
              onChange={e => {
                setCssId(e.target.value);
              }}
            />
          </label>
        </div>
      </div>

      <input type="submit" value={labels.search} />
    </form>
  );
};

export default SearchForm;
