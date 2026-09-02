// TELA - O QUE VAI FAZER:  o formulário para cadastrar/editar uma tarefa




import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function FormularioTarefaScreen() {

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Nova Tarefa
      </Text>

      <Text style={styles.label}>
        Título da tarefa
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o título da tarefa"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>
        Descrição
      </Text>

      <TextInput
        style={styles.inputDescricao}
        placeholder="Digite uma descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.textoBotao}>
          Adicionar Tarefa
        </Text>
      </TouchableOpacity>

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
    fontSize: 36,
    fontWeight: "800",
    color: "#009494",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  inputDescricao: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#009494",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

});