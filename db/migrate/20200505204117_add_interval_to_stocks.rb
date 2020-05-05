class AddIntervalToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :interval, :string, null: false
  end
end
