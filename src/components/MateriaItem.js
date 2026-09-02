import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MateriaItem({
  materia,
  aoExcluir,
  navigation,
}) {
  return (
    <View style={styles.item}>

      <View style={styles.informacoes}>

        <Text style={styles.nomeMateria}>
          {materia.nome}
        </Text>

        <Text style={styles.textoTarefas}>
          Matéria de estudos
        </Text>

      </View>

      <TouchableOpacity
        style={styles.botaoEntrar}
        onPress={() =>
          navigation.navigate("Tarefas", {
            materia: materia,
          })
        }
      >
        <Text style={styles.textoBotao}>
          Entrar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoExcluir}
        onPress={() => aoExcluir(materia.id)}
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
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginBottom: 10,
  },

  informacoes: {
    flex: 1,
    marginRight: 10,
  },

  nomeMateria: {
    fontSize: 18,
    fontWeight: "bold",
  },

  textoTarefas: {
    fontSize: 13,
    color: "#888",
    marginTop: 4,
  },

  botaoEntrar: {
    backgroundColor: "#009494",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 6,
  },

  botaoExcluir: {
    backgroundColor: "#aa291b",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
  },

  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});