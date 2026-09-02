// TELA - O QUE VAI FAZER: mostra as tarefas de uma matéria específica

import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import TarefaItem from "../components/TarefaItem";

export default function TarefaScreen({ route, navigation }) {
  const { materia } = route.params;

  const [nomeTarefa, setNomeTarefa] = useState("");

  const [tarefas, setTarefas] = useState(
    materia.tarefas || []
  );

  function adicionarTarefa() {
    const tituloLimpo = nomeTarefa.trim();

    if (tituloLimpo === "") {
      return;
    }

    const novaTarefa = {
      id: Date.now().toString(),
      titulo: tituloLimpo,
      concluida: false,
    };

    setTarefas((listaAtual) => [
      ...listaAtual,
      novaTarefa,
    ]);

    setNomeTarefa("");
  }

  function alternarTarefa(id) {
    setTarefas((listaAtual) =>
      listaAtual.map((tarefa) =>
        tarefa.id === id
          ? {
              ...tarefa,
              concluida: !tarefa.concluida,
            }
          : tarefa
      )
    );
  }

  function excluirTarefa(id) {
    setTarefas((listaAtual) =>
      listaAtual.filter(
        (tarefa) => tarefa.id !== id
      )
    );
  }

  const concluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoVoltar}>
          ← Voltar
        </Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        {materia.nome}
      </Text>

      <Text style={styles.progresso}>
        {concluidas} de {tarefas.length}{" "}
        {tarefas.length === 1
          ? "assunto concluído"
          : "assuntos concluídos"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite um assunto"
        value={nomeTarefa}
        onChangeText={setNomeTarefa}
        onSubmitEditing={adicionarTarefa}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarTarefa}
      >
        <Text style={styles.textoBotao}>
          + Adicionar Assunto
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TarefaItem
            tarefa={item}
            aoAlternar={alternarTarefa}
            aoExcluir={excluirTarefa}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.textoVazio}>
            Nenhum assunto cadastrado.
            {"\n"}
            Adicione os assuntos que você precisa estudar.
          </Text>
        }
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

  botaoVoltar: {
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 3,
    marginBottom: 5,
  },

  textoVoltar: {
    color: "#040404",
    fontSize: 16,
    fontWeight: "bold",
  },

  titulo: {
    fontSize: 34,
    fontWeight: "800",
    color: "#00585E",
    textAlign: "center",
    marginTop: 5,
    marginBottom: 5,
  },

  progresso: {
    textAlign: "center",
    color: "#777",
    fontSize: 14,
    marginBottom: 20,
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

  textoVazio: {
    textAlign: "center",
    color: "#999",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 30,
  },
});