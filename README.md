<h1 align="center">
     <a href="#" > Geração de Fórmulas FND/FNC </a>
</h1>
<h3 align="center">
    Projeto proposto durante a Disciplina de Lógica para Computação no período de 2020.5 oferecida pela Universidade Federal Rural do Rio de Janeiro.
</h3>

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Como executar](#%EF%B8%8F-como-executar)
   * [Como usar](#%EF%B8%8F-como-usar)
   * [Contribuidores](#-contribuidores)
   * [Agradecimentos](#-agradecimentos)
   * [Como contribuir no projeto](#-como-contribuir-no-projeto)
   * [Licença](#user-content--licença)
<!--te-->

---

## 💻 Sobre o projeto

O objetivo do projeto é construir, a partir de uma tabela verdade de uma fórmula, uma ferramenta que apresente a Fórmula Normal Conjuntiva e Disjuntiva em relação à fórmula original.<br>

Os detalhes da implementação da geração da tabela verdade a partir de uma dada string de expressão lógica pelo usuário podem ser encontrados <a href="https://github.com/RamonMachado/truthTableGenerator">aqui</a>

- [x] Os usuários tem acesso ao aplicativo web, onde podem:
   - [x] Construir a tabela verdade.
   - [x] Gerar Fórmula Normal Disjuntiva (FND) e Fórmula Normal Conjuntiva (FNC).

---

## ▶️ Como executar

1. Clone o repositório para sua máquina
<br>`
git clone https://github.com/oliveiraviniciuss/trab-logica
`

2. Na pasta do projeto, mude a branch para integracao_tabela_verdade
<br>`
git checkout integracao_tabela_verdade
`

3. Execute o arquivo "index.html"

---

## ⌨️ Como usar
Digite a expressão lógica e clique em "Gerar Tabela Verdade".

Regras:
- [x] Variáveis precisam ser maiúsculas.
- [x] Variáveis podem ter nomes de A a Z, com a exceção da letra V (Símbolo representativo do operador “OR”).
- [x] A prioridade de interpretação será sempre da direita para a esquerda.
- [x] É necessário colocar parênteses para definir prioridades:
  - [x] A^BvC - ERRADO
  - [x] (A^B)vC - CERTO
  
Operadores:
- [x] AND: ^
- [x] OR: v
- [x] IMPLIES: ->
- [x] IF AND ONLY IF: <->
- [x] NOT: ~


---

## 👨‍💻 Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/Filippo43"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/19348989?s=400&u=8d154a906056aec4ebede087e49bd82380e78778&v=4" width="100px;" alt=""/><br /><sub><b>Gabriel Filippo</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Igorbrito77"><img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/20285772?s=400&u=6559423386add50af6a61c5c8e4ac25e0a8ff8e1&v=4" width="100px;" alt=""/><br /><sub><b>Igor Brito</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/oliveiraviniciuss"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/42152790?s=400&u=5fc8a6a89bfd02510b4528b5af7022d157d0f3f0&v=4" width="100px;" alt=""/><br /><sub><b>Vinícius de Oliveira</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/edds018"><img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/20283003?s=400&u=24d9b354295b193681be1bcad171885858e43394&v=4" width="100px;" alt=""/><br /><sub><b>Edson Neves</b></sub></a><br /></td>   
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/joaogs"><img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/25991168?s=400&u=917e61883c731388d423c3ab94b5256260d7a50d&v=4" width="100px;" alt=""/><br /><sub><b>João Simões</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/EoqLp"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/23413851?s=400&u=09cb131da4653d6e58a6885a99d1b239e84b8b3e&v=4" width="100px;" alt=""/><br /><sub><b>Felipe Rangel</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/Felcks"><img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/5620769?s=400&u=6e49ebf68e64115b6296912ab27a591b7b0a379e&v=4" width="100px;" alt=""/><br /><sub><b>Matheus Felipe</b></sub></a><br /></td>
    <td align="center"></td>   
  </tr>
</table>

---
## 👏 Agradecimentos

<table>
  <tr>
    <td align="center"><a href="https://github.com/RamonMachado"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/19560225?s=400&u=542ae0b0efdac0586a0687d7494830e15792b1e8&v=4" width="100px;" alt=""/><br /><sub><b>Ramon Machado</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/RafaelLDSX"><img style="border-radius: 50%;" src="https://avatars0.githubusercontent.com/u/19434605?s=400&u=d7263ba4290052d14259799a16b3b5f3f9120239&v=4" width="100px;" alt=""/><br /><sub><b>Rafael Lemos</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/MarcioMed07"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/19434598?s=400&u=95d1f8adf29dbbe1bd350392d1c376cb64985c07&v=4" width="100px;" alt=""/><br /><sub><b>Marcio Medeiros</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/D8989"><img style="border-radius: 50%;" src="https://avatars3.githubusercontent.com/u/20309537?s=400&u=f61691f100e912121ad9f651b4fe61e732046b1c&v=4" width="100px;" alt=""/><br /><sub><b>Daniel Moreira</b></sub></a><br /></td>   
  </tr>
 
</table>

---

## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

---
