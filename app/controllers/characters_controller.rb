class CharactersController < ActionController::Base
  def hiragana
    respond_to do |format|
      format.json
    end
  end
end
