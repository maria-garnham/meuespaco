import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TarefaItem from "../components/TarefaItem";

export default function TarefasScreen({ route, navigation }) {
  const { materia } = route.params;
  const CHAVE_TAREFAS = `@tarefas_${materia.id}`;

  const [nomeTarefa, setNomeTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 1. Carrega as tarefas salvas desta matéria ao abrir a tela
  useEffect(() => {
    async function carregarTarefas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_TAREFAS);
        if (dadosSalvos !== null) {
          setTarefas(JSON.parse(dadosSalvos));
        } else {
          setTarefas(materia.tarefas || []);
        }
      } catch (erro) {
        console.error("Erro ao carregar tarefas:", erro);
      } finally {
        setCarregando(false);
      }
    }

    carregarTarefas();
  }, []);

  // 2. Salva no AsyncStorage sempre que as tarefas dessa matéria mudarem
  useEffect(() => {
    async function salvarTarefas() {
      if (!carregando) {
        try {
          await AsyncStorage.setItem(
            CHAVE_TAREFAS,
            JSON.stringify(tarefas)
          );
        } catch (erro) {
          console.error("Erro ao salvar tarefas:", erro);
        }
      }
    }

    salvarTarefas();
  }, [tarefas, carregando]);

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
          ? "tarefa concluída"
          : "tarefas concluídas"}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Digite uma tarefa"
        value={nomeTarefa}
        onChangeText={setNomeTarefa}
        onSubmitEditing={adicionarTarefa}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={adicionarTarefa}
      >
        <Text style={styles.textoBotao}>
          + Adicionar Tarefa
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
            Nenhuma tarefa cadastrada.
            {"\n"}
            Adicione as tarefas que você precisa estudar.
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