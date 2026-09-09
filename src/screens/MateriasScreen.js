import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import MateriaItem from "../components/MateriaItem";

export default function MateriasScreen({ navigation }) {
  const [nomeMateria, setNomeMateria] = useState("");
  const [descricaoMateria, setDescricaoMateria] = useState("")
  const [materias, setMaterias] = useState([]);

  function adicionarMateria() {
    if (nomeMateria.trim() === "") {
      return;
    }

    const novaMateria = {
      id: Date.now().toString(),
      nome: nomeMateria,
      descricao: descricaoMateria, 
      tarefas: [],
    };

    setMaterias([...materias, novaMateria]);

    setNomeMateria("");
    setDescricaoMateria(""); 
  }

  function excluirMateria(id) {
    const novaLista = materias.filter(
      (materia) => materia.id !== id
    );

    setMaterias(novaLista);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Meu Espaço
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome da matéria (ex: Matemática)"
        value={nomeMateria}
        onChangeText={setNomeMateria}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição da matéria (ex: Prof. Carlos - Sala 12)"
        value={descricaoMateria}
        onChangeText={setDescricaoMateria}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarMateria}
      >
        <Text style={styles.textoBotao}>
          + Adicionar Matéria
        </Text>
      </TouchableOpacity>

      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MateriaItem
            materia={item}
            aoExcluir={excluirMateria}
            navigation={navigation}
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  titulo: {
    fontSize: 42,
    fontWeight: "800",
    color: "#00585E",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 25,
    letterSpacing: 1,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },

  botao: {
    backgroundColor: "#009494",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});