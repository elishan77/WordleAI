from backend.game.feedback import generate_feedback

def test_generate_feedback():
    assert generate_feedback("apple", "apple") == ['green', 'green', 'green', 'green', 'green']
    assert generate_feedback("price", "apple") == ['yellow', 'gray', 'gray', 'gray', 'green']
    assert generate_feedback("peach", "apple") == ['yellow', 'yellow', 'yellow', 'gray', 'gray']
    assert generate_feedback("grape", "apple") == ['gray', 'gray', 'yellow', 'yellow', 'green']
    
    # ----------- test occurence rule -----------
    # only two p's should be colored yellow/green, the third p should be gray
    assert generate_feedback("poppy", "apple") == ['yellow', 'gray', 'green', 'gray', 'gray']
    
    # the first two r's should be gray, only the last r should be green
    assert generate_feedback("error", "mover") == ['yellow', 'gray', 'gray', 'yellow', 'green']

    # only one e should be yellow
    assert generate_feedback("deers", "mover") == ['gray', 'yellow', 'gray', 'yellow', 'gray']

if __name__ == "__main__":
    test_generate_feedback()
    print("All tests passed!")