class StockHandler
  def initialize(params, user)
    @stock_info = params[:stock].split(' - ')
    @ticker_name = @stock_info[0]
    @stock_name = @stock_info[1]
    @interval = params[:interval]
    @scale = params[:scale]
    @user = user
  end

  def user_signed_in?
    if @user.nil?
      return false
    else
      return true
    end
  end
  def get_response
    series = ""
    url = ""
    secret_key = ENV["api_key"]
    if @interval == "Weekly"
      series = "Weekly Time Series"
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=#{@ticker_name}&apikey=#{secret_key}"
    elsif @interval == "Daily"
      series = "Time Series (Daily)"
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=#{@ticker_name}&apikey=#{secret_key}"
    else
      series = "Monthly Time Series"
      url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=#{@ticker_name}&apikey=#{secret_key}"
    end
    api_response = Faraday.get(url)
    return [JSON.parse(api_response.body), series]
  end

  def create_stock_info
    response = get_response()
    parsed_response = response[0]
    series = response[1]
    if parsed_response["Error Message"]
      return { status: 'error', message: "Invalid symbol" }
    elsif parsed_response["Note"]
      return { status: 'error', message: "Too many API calls" }
    elsif parsed_response[series].length < 36
      return { status: 'error', message: "Not enough data, stock must have at least 36 data points" }
    else
      stock_data = []
      counter = 1
      parsed_response[series].each do |key, value|
        if counter <= 36
          stock_data.push({
            "date" => key,
            "price" => value["1. open"]
          })
          counter += 1
        else
          break
        end
      end
      return stock_data
    end
  end

  def create_melody_and_stock
    stock_data = create_stock_info()
    if stock_data.kind_of?(Array) == false
      return stock_data
    elsif @stock_name == nil
      return { status: 'error', message: "Select Stock from dropdown menu" }
    end
    stock = Stock.new(symbol: @ticker_name, prices: stock_data, name: @stock_name, interval: @interval)
    melody = Melody.new
    if user_signed_in?
      melody.user = @user
    end

    melody.stock = stock
    melody.scale = Scale.find_by(name: @scale)
    melody_and_stock = [melody, stock]
    return melody_and_stock
  end

  def render_json
    melody_and_stock = create_melody_and_stock()
    if melody_and_stock.kind_of?(Array) == false
      return melody_and_stock
    end
    melody = melody_and_stock[0]
    stock = melody_and_stock[1]
    if stock.valid?
      return {
        melody: melody.get_melody,
        name: melody.get_name,
        dates: stock.get_date_array,
        prices: stock.get_price_array,
        interval: stock.interval,
        user: @user,
        fullMelody: melody,
        stock: stock
      }
    else
      return {
        status: "error",
        message: "Please select stock from dropdown menu",
        code: 404
      }
    end
  end
end
