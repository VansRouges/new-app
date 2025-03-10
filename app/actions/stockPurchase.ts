export const createStockPurchase = async ({
  data,
  user_id,
  full_name,
  stock_value_entered,
  stock_quantity,
  stock_token,
  stock_status,
  stock_initial_value,
  stock_token_address,
}: {
  data: any;
  user_id: string | null | undefined;
  full_name: string | null | undefined;
  stock_value_entered: number;
  stock_quantity: number;
  stock_token: string;
  stock_status: string;
  stock_initial_value: number;
  stock_token_address: string;
}) => {
  const stockPurchasePayload =
  data && data.symbol.trim() !== ""
      ? {
        stock_symbol: data.symbol,
        stock_name: data.name,
        stock_quantity,
        stock_initial_value,
        stock_initial_value_pu: data.price,
        stock_change: data.change,
        stock_current_value: 0.0,
        stock_total_value: 0.0,
        stock_profit_loss: 0.0,
        isProfit: false,
        isMinus: data.isMinus,
        stock_value_entered,
        stock_token,
        stock_token_address,
        stock_status,
        isTrading: false,
        user_id,
        full_name
      }
      : null;

    try {
      const response = await fetch("/api/stock-purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stockPurchasePayload),
      });
  
      if (!response.ok) throw new Error("Failed to create stock purchase");
  
      return await response.json();
    } catch (error) {
      console.error("Error in createStockPurchase:", error);
      throw error;
    }
  };
  