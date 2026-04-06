from core.engine import executar


def main():
    dados = {"teste": True}
    resultado = executar(dados)
    print(resultado)


if __name__ == "__main__":
    main()
