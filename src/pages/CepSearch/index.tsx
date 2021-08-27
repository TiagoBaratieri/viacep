import axios from 'axios';
import { useState } from 'react';
import ResultCard from '../../components/ResultCard';
import './styles.css';

type FormData = {
  cep: string;
};

type Address = {
  logradouro: string;
  localidade: string;
  bairro: string;
  uf: string;
  ddd: string;
};

const CepSearch = () => {
  const [address, setAddress] = useState<Address>();
  const [formData, setFormdata] = useState<FormData>({
    cep: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormdata({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .get(`https://viacep.com.br/ws/${formData.cep}/json/`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        console.log(error);
      });
  };

  return (
    <div className="cep-search-container">
      <h1 className="text-primary">Busca CEP</h1>
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="cep"
              value={formData.cep}
              className="search-input"
              placeholder="CEP (somente números)"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Buscar
            </button>
          </div>
        </form>
        {address && (
          <>
            <ResultCard title="Logradouro" description={address.logradouro} />
            <ResultCard title="Localidade" description={address.localidade} />
            <ResultCard title="Bairro" description={address.bairro} />
            <ResultCard title="uf" description={address.uf} />
            <ResultCard title="ddd" description={address.ddd} />
          </>
        )}
      </div>
    </div>
  );
};

export default CepSearch;
