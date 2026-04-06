import { expect, test } from "@playwright/test";

const PRODUCT_BRANCO = "Cartela com 30 ovos brancos";
const PRODUCT_VERMELHO = "Cartela com 30 ovos vermelhos";

test.beforeEach(async ({ page }) => {
  await page.goto("/produtos");
  await page.evaluate(() => sessionStorage.removeItem("meuovo:order"));
  await page.reload();
});

test.describe("Fluxo de pedido em /produtos", () => {
  test("fluxo principal, resumo e link WhatsApp com mensagem completa", async ({
    page,
  }) => {
    await page
      .locator("li")
      .filter({ hasText: PRODUCT_BRANCO })
      .getByRole("button", { name: "Adicionar ao pedido" })
      .click();
    await page
      .locator("li")
      .filter({ hasText: PRODUCT_VERMELHO })
      .getByRole("button", { name: "Adicionar ao pedido" })
      .click();

    await expect(
      page.getByRole("region", { name: "Resumo do pedido" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Seu pedido" })).toBeVisible();
    await expect(page.getByText(/Total estimado/)).toBeVisible();

    await page.getByLabel(/Nome ou estabelecimento/).fill("Cliente E2E Teste");
    await page.getByLabel(/Tipo de cliente/).selectOption("restaurante");

    const link = page.getByRole("link", {
      name: "Fechar pedido no WhatsApp",
    });
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toMatch(/https:\/\/wa\.me\/\d+/);

    const url = new URL(href!);
    const text = decodeURIComponent(url.searchParams.get("text") || "");

    expect(text).toContain("Cliente E2E Teste");
    expect(text).toContain("Restaurante");
    expect(text).toContain(PRODUCT_BRANCO);
    expect(text).toContain(PRODUCT_VERMELHO);
    expect(text).toMatch(/Total estimado/i);
    expect(text).toMatch(/47[,.]80/);
  });

  test("persistência após reload", async ({ page }) => {
    await page
      .locator("li")
      .filter({ hasText: PRODUCT_BRANCO })
      .getByRole("button", { name: "Adicionar ao pedido" })
      .click();
    await page.getByLabel(/Nome ou estabelecimento/).fill("Nome Persistente");
    await page.getByLabel(/Tipo de cliente/).selectOption("mercado");

    await page.reload();

    await expect(page.getByLabel(/Nome ou estabelecimento/)).toHaveValue(
      "Nome Persistente",
    );
    await expect(page.getByLabel(/Tipo de cliente/)).toHaveValue("mercado");
    await expect(page.getByRole("heading", { name: "Seu pedido" })).toBeVisible();
    await expect(
      page
        .getByRole("region", { name: "Resumo do pedido" })
        .getByText(PRODUCT_BRANCO),
    ).toBeVisible();
  });

  test("limpar pedido e nada restaurado após reload", async ({ page }) => {
    await page
      .locator("li")
      .filter({ hasText: PRODUCT_BRANCO })
      .getByRole("button", { name: "Adicionar ao pedido" })
      .click();
    await page.getByLabel(/Nome ou estabelecimento/).fill("Será limpo");

    await page.getByRole("button", { name: "Limpar" }).click();

    await expect(
      page.getByText(/Nenhum item no pedido/i),
    ).toBeVisible();

    await page.reload();

    await expect(
      page.getByText(/Nenhum item no pedido/i),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Seu pedido" }),
    ).toHaveCount(0);
  });
});
