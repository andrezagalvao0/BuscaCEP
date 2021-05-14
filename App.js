import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';


export default function App() {
  const [cep, setCep] = useState("")
  const [endereco, setEndereco] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState("")

  const buscarCep = () => {

    if (cep.replace("-", "").length != 8) {
      setErro("CEP Inválido")
      return
    }


   
    fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json`)
      .then(res => res.json())
      .then(obj => {
        if(obj.erro){
          setErro("CEP não encontrado!")
          return
        }

        setEndereco(obj)
        setErro("")
      })
      .catch(() => {
        setErro("Erro ao buscar o endereço!")
      })
      
  }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>
          Buscar CEP 
        </Text>
        <TextInput 
          value = {cep}
          onChangeText={input => setCep(input)}
          style={styles.input}
          placeholder="Informe o CEP" 
          placeholderTextColor = '#c3c3c3' 
        />

        <TouchableOpacity
          style = {styles.button}
          onPress= {buscarCep}
        >
          <Text>
            Buscar
          </Text>
        </TouchableOpacity>




        {erro != "" && <Text style={styles.erro}>{erro}</Text>}

        {endereco != null && !carregando && erro == "" && (
          <View style={styles.texto_box}>
            <Text style={styles.texto}>
              CEP: {endereco.cep}
            </Text>
            <Text style={styles.texto}>
              Rua: {endereco.logradouro}
            </Text>
            <Text style={styles.texto}>
              Bairro: {endereco.bairro}
            </Text>
            <Text style={styles.texto}>
              Cidade: {endereco.localidade}
            </Text>
            <Text style={styles.texto}>
              Estado: {endereco.uf}
            </Text>
          </View>
        )}
        <StatusBar style="auto" />
      
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 100,
  },

  input: { 
    marginTop: 20, 
    borderColor: '#c3c3c3',
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15
   },

  texto_box: {
    marginTop: 20
  },

  texto: {
    fontSize: 17
  },

  text: {
    fontSize: 20,
    textAlign: 'center'
  },
  erro: {
    marginVertical:12,
    fontSize: 18,
    color: '#93032e'
  },

  button: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c3c3c3',
    paddingHorizontal: 20,
    paddingVertical: 15
  },

  
});
