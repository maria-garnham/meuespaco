// TELA - O QUE VAI FAZER: Representará uma tarefa ------ Sofia



import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TarefaItem({
  tarefa,
  aoAlternar,
  aoExcluir,
}) {
  return (
    <View style={styles.item}>

      <TouchableOpacity
        style={styles.informacoes}
        onPress={() => aoAlternar(tarefa.id)}
      >

        <Text
          style={[
            styles.titulo,
            tarefa.concluida && styles.tarefaConcluida,
          ]}
        >
          {tarefa.titulo}
        </Text>

        <Text style={styles.status}>
          {tarefa.concluida
            ? "Assunto concluído"
            : "Assunto pendente"}
        </Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoConcluir}
        onPress={() => aoAlternar(tarefa.id)}
      >
        <Text style={styles.textoBotao}>
          {tarefa.concluida ? "Desfazer" : "Concluir"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluir(tarefa.id)}
      >
        <Text style={styles.textoBotao}>
          Excluir
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
  },

  informacoes: {
    flex: 1,
    marginRight: 8,
  },

  titulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
  },

  tarefaConcluida: {
    textDecorationLine: "line-through",
    color: "#999",
  },

  status: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },

  botaoConcluir: {
    backgroundColor: "#009494",
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 6,
    marginRight: 5,
  },

  botaoExcluir: {
    backgroundColor: "#aa291b",
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: 6,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 11,
  },

});