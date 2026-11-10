# Trénink

Denisův tréninkový deník jako webová aplikace (PWA), postavená stejně jako Pražec (`stolarikdenis-design/Prazec`). Návod je v `README.md`.

- Web: https://stolarikdenis-design.github.io/trenink/ (GitHub Pages z `main`, složka `/docs`).
- Verze pro claude.ai: soukromý artefakt https://claude.ai/artifact/M8L5jwUeuUjq2kxqvFWWAw. Zdroj je stejný, `node build.mjs` ji píše do `out/artifact.html`. Na claude.ai ukládá do `db` (tréninky `data/users/<id>`, míry `data/users/<id>/profile/body`, snapshoty jsou zmražené, kopírovat před úpravou).
- Po změně v `src/` vždy `node build.mjs` a commitni i `docs/`. Service worker má verzi z buildu, takže se telefon aktualizuje sám.
- Plány jsou v `PLANS` v `src/app.js`: B = Day 1 (bench/dřep/RDL), D = Day 2 (jednoručky, smith, výpady), C = Day 3 bonus, A = starší tlaky a přítahy mimo pořadí. Na řadě se střídá B a D. Tréninky uložené před zavedením plánů nemají `pv` a počítají se jako B. Data v telefonu jsou v localStorage (`denis-trenink-v1`, `denis-postava-v1`), mezi zařízeními se přenáší zálohou (Přehled → Záloha).
- Když Denis pošle plán s novými čísly, uprav cvik v `PLANS` a dej mu `since: "RRRR-MM-DD"`: čísla z plánu pak jednou přebijí návrh podle minulého tréninku (cvik naposledy cvičený před tím datem).
- Texty jsou česky, Denis rozhodnutí bere doporučenou volbu.
